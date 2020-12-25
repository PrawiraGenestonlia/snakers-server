import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import helmet from 'helmet';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';
import swaggerUi from "swagger-ui-express";
import logger from './shared/Logger';
import { RegisterRoutes } from '../tsoa-build/routes';


export const app = express();
const { BAD_REQUEST } = StatusCodes;


/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// Add APIs
app.get('/', (req, res) => res.redirect('/docs/'));
app.get('/favicon.ico', (req, res) => res.status(204));

// Swagger Docs
app.use("/docs", swaggerUi.serve, async (_req: Request, res: Response) => {
    return res.send(
        swaggerUi.generateHTML(await import("../tsoa-build/swagger.json"))
    );
});

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.err(err, true);
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});

RegisterRoutes(app);





export const generateRoomId = (currentRoomIds: string[]) => {
  let id: string = pad(Math.floor(100000 + Math.random() * 900000), 6);
  while (currentRoomIds.includes(id)) {
    id = pad(Math.floor(100000 + Math.random() * 900000), 6);
  }
  return id;
}

const pad = (num: number, size: number): string => {
  const s: string = "000000000" + num.toString();
  return s.substr(s.length - size);
}
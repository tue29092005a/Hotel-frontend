export const calculateNights = (checkIn: string, checkOut: string): number => {
    if (!checkIn || !checkOut) return 1;

    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);

    // Tính số mili-giây chênh lệch
    const diffTime = d2.getTime() - d1.getTime();

    // Chuyển đổi sang số ngày (1 ngày = 1000ms * 60s * 60m * 24h)
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return nights <= 0 ? 1 : nights;
};
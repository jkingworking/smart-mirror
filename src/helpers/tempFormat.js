export default function tempFormat(temp) {
    return temp ? `${Math.round(temp)}°` : '';
}
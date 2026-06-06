export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const dataUrl = reader.result;

      const [header, base64] = String(dataUrl).split(',');

      const mimeType =
        header.match(/data:(.*?);/)?.[1] || file.type || 'image/jpeg';

      resolve({
        base64,
        mimeType,
        preview: dataUrl,
      });
    };

    reader.onerror = () =>
      reject(new Error('Failed to read image file'));

    reader.readAsDataURL(file);
  });
}
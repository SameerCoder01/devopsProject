function getAuthHeader(privateKey) {
  const token = Buffer.from(`${privateKey}:`).toString("base64");
  return `Basic ${token}`;
}

function createImagekitClient() {
  const { IMAGEKIT_PRIVATE_KEY } = process.env;

  if (!IMAGEKIT_PRIVATE_KEY) {
    throw new Error("ImageKit private key is missing. Set IMAGEKIT_PRIVATE_KEY in .env");
  }

  return {
    async upload({ file, fileName, folder }) {
      const body = new URLSearchParams();
      body.set("file", file);
      body.set("fileName", fileName);
      if (folder) body.set("folder", folder);

      const response = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
        method: "POST",
        headers: {
          Authorization: getAuthHeader(IMAGEKIT_PRIVATE_KEY),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Image upload failed");
      }

      return result;
    },

    async deleteFile(fileId) {
      const response = await fetch(`https://api.imagekit.io/v1/files/${fileId}`, {
        method: "DELETE",
        headers: {
          Authorization: getAuthHeader(IMAGEKIT_PRIVATE_KEY),
        },
      });

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.message || "Image delete failed");
      }
    },
  };
}

module.exports = createImagekitClient;
function getImageFromProperty(imageProp) {
    return imageProp?.files?.[0]?.external?.url || imageProp?.files?.[0]?.file?.url || null;
}

export { getImageFromProperty };

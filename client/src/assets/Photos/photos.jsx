export default async function importPhotos(){
    const importPromises = [];

    for (let i = 1; i <= 47; i++){
        importPromises.push(import(`./photo${i}.webp`));
    }

    try{
        const importedModules = await Promise.all(importPromises);
        return importedModules.map((module) => module.default);
    } catch (err) {
        console.error('Error importing photos: ', err);
        return [];
    }

}
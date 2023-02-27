function stringToSlug(str) {
    // remove accents
    var from = 'àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ',
        to = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy';
    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(RegExp(from[i], 'gi'), to[i]);
    }

    str = str
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\-]/g, '-')
        .replace(/-+/g, '-');

    return str;
}

function findByKeyWord(array, keyword, currentPath = []) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
        let item = array[i];
        // Get result
        const newCurrentPathElem = {
            name: item.name,
            path: currentPath.length === 0 ? item.path : currentPath[currentPath.length - 1].path + '/' + item.path,
        };
        const indexOf = stringToSlug(item.name).indexOf(stringToSlug(keyword));
        if (indexOf != -1) {
            result = [...result, { item, index: indexOf, path: [...currentPath, newCurrentPathElem] }];
        }

        if (item.children) {
            result = [...result, ...findByKeyWord(item.children, keyword, [...currentPath, newCurrentPathElem])];
        }
    }
    return result;
}

export default findByKeyWord;

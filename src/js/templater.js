(function () {
    module.exports = function templater(template, replacement) {
        const regex = /{{(\w*(?:\.\w+)*)}}/g;
        let m, result = template;
        while ((m = regex.exec(template)) !== null) {
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            result = result.replace(m[0], replacement[m[1]]);
        }
        return result;
    }
})();
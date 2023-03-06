export default function groupBy(xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
}

export function groupByMap(arr, keySupplier) {
    return arr.reduce(function (rv, x) {
        const key = keySupplier(x);
        (rv[key] = rv[key] || []).push(x);
        return rv;
    }, {});
}

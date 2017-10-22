function bake_cookie(name, value) {
    var cookie = [name, '=', JSON.stringify(value), '; path=/;'].join('');
    document.cookie = cookie;
}

function read_cookie(name) {
    var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
    result && (result = JSON.parse(result[1]));
    return result;
}

function delete_cookie(name) {
    document.cookie = [name, '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; domain=.', window.location.host.toString()].join('');
}
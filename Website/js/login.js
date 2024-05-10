const initSqlJs = window.initSqlJs;

const SQL = await initSqlJs({
    locateFile: file => `https://sql.js.org/dist/${file}`
  });
  function loadBinaryFile(path,success) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", path, true);
    xhr.responseType = "arraybuffer";
    xhr.onload = function() {
        var data = new Uint8Array(xhr.response);
        var arr = new Array();
        for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        success(arr.join(""));
    };
    xhr.send();
};

loadBinaryFile('/Website/db/main.db', function(data){
    var db = new SQL.Database(data);
    // Database is ready
    let sqlstr = "CREATE TABLE test (id char, pw char); \
    INSERT INTO test VALUES ('huh@gmail.com', '123'); \
    INSERT INTO test VALUES ('1', 'world');";
    db.run(sqlstr); // Run the query without returning anything

    // Prepare an sql statement
    const stmt = db.prepare("SELECT * FROM test WHERE id=:id AND pw=:pw");

    // Bind values to the parameters and fetch the results of the query
    const result = stmt.getAsObject({':id' : 'huh@gmail.com', ':pw' : '123'});
    console.log(result);

    // Bind other values
    stmt.bind(['1', 'world']);
    while (stmt.step()) console.log(stmt.get());
    // free the memory used by the statement
    stmt.free();
});

export function login() {
    var email = document.getElementById("login_main_email").value;
    var password = document.getElementById("login_main_password").value;
    if(email == "huh@gmail.com" && password == "123") {
        alert("HOORAY!");
    }
}
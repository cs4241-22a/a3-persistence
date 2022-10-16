// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "body {\n  /* flexbox settings */\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n\n  margin: 0 auto;\n  margin-top: 10px;\n  width: 400px;\n  padding: 1em;\n  border: 5px double #cccccc;\n  border-radius: 1em;\n\n  background-color: #fffafb;\n\n}\n\nul {\n  list-style: none;\n  padding: 0;\n  margin: auto;\n}\n\nli {\n  width: 200px;\n  margin: auto;\n}\n\nlabel {\n  display: inline-block;\n  width: 90px;\n  text-align: right;\n  font-family: \"Gantari\", sans-serif;\n}\n\ninput:focus {\n  border-color: #000000;\n}\n\n#error {\n  color: red;\n  font-family: \"Rubik\", sans-serif;\n}\n\n.button {\n  margin: auto;\n  margin-top: 1em;\n}\n\ntable.stat-table {\n  padding-top: 10px;\n  font-family: \"Rubik\", sans-serif;\n  margin-left: auto;\n  margin-right: auto;\n  width: 400px;\n  table-layout: fixed;\n}\n\ntable.stat-table td,\nth {\n  padding-left: 10px;\n  text-align: center;\n}\n\ntable.stat-table th {\n  font-weight: normal;\n}\n\ntable.stat-table td {\n  font-weight: bold;\n  font-size: large;\n  overflow-wrap: break-word;\n  word-wrap: break-word;\n}\n\ntable.num-table td {\n  align-self: left;\n  font-family: \"Rubik\", sans-serif;\n  font-size: x-large;\n  font-weight: bold;\n}\n\ntable.num-table td:hover {\n  text-decoration: line-through;\n}\n\nhr {\n  width: 100%;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}
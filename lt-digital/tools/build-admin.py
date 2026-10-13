"""Intègre admin.html dans la fonction protégée api/_admin_page.js.
À relancer chaque fois que tu modifies admin.html :  python3 tools/build-admin.py"""
import json, pathlib
r = pathlib.Path(__file__).resolve().parent.parent
html = (r / "admin.html").read_text(encoding="utf-8")
(r / "api" / "_admin_page.js").write_text(
    "/* Généré par tools/build-admin.py à partir de admin.html — ne pas modifier à la main. */\nmodule.exports = "
    + json.dumps(html, ensure_ascii=False).replace("\u2028", "\\u2028").replace("\u2029", "\\u2029") + ";\n", encoding="utf-8")
print("ok", len(html), "octets")

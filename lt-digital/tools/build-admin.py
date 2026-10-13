"""Intègre les pages d'administration dans la fonction protégée (api/_admin_page.js et api/_admin_adv.js).
À relancer chaque fois que tu modifies admin.html ou tools/admin-avance.html :  python3 tools/build-admin.py"""
import json, pathlib
r = pathlib.Path(__file__).resolve().parent.parent
def bundle(src, out):
    html = (r / src).read_text(encoding="utf-8")
    (r / "api" / out).write_text(
        "/* Généré par tools/build-admin.py à partir de " + src + " — ne pas modifier à la main. */\nmodule.exports = "
        + json.dumps(html, ensure_ascii=False).replace("\u2028", "\\u2028").replace("\u2029", "\\u2029") + ";\n", encoding="utf-8")
    print("ok", src, len(html), "caractères")
bundle("admin.html", "_admin_page.js")
bundle("tools/admin-avance.html", "_admin_adv.js")

with open("app/cases/page.tsx", encoding="utf-8") as f:
    c = f.read()
idx = c.rfind('color: "#4f46e5",')
print("idx:", idx)
print("after:", c[idx:idx+80])
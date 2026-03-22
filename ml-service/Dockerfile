FROM python:3.10.13
 
RUN useradd -m -u 1000 user
 
USER user
 
ENV PATH="/home/user/.local/bin:$PATH"
 
WORKDIR /main
 
COPY --chown=user ./requirements.txt requirements.txt
RUN pip install --no-cache-dir --upgrade -r requirements.txt
 
# ---------------------------------------------------------------
# Patch keras Resizing.__init__ to accept the 'antialias' kwarg
# that was saved into our .keras files by a newer Keras version.
# We insert it as a keyword arg with a default value just before
# **kwargs so there is no Python syntax violation.
# ---------------------------------------------------------------
RUN python3 - <<'PYEOF'
import pathlib, re
 
resizing_path = None
for p in pathlib.Path("/home/user/.local/lib").rglob("resizing.py"):
    if "keras" in str(p) and "preprocessing" in str(p):
        resizing_path = p
        break
 
if resizing_path is None:
    raise RuntimeError("Could not find keras resizing.py")
 
print(f"Found: {resizing_path}")
src = resizing_path.read_text()
 
if "antialias" in src:
    print("Already contains 'antialias' — no patch needed.")
else:
    # From the file we can see the signature ends with:
    #     data_format=None,
    #     **kwargs,
    # ):
    # We insert antialias=False between data_format and **kwargs.
    old = "        data_format=None,\n        **kwargs,"
    new = "        data_format=None,\n        antialias=False,  # compat: accepted & ignored\n        **kwargs,"
    if old not in src:
        raise RuntimeError(
            f"Expected pattern not found in resizing.py.\n"
            f"First 80 lines:\n" +
            "\n".join(f"{i}: {l}" for i, l in enumerate(src.splitlines()[:80]))
        )
    patched = src.replace(old, new, 1)
    resizing_path.write_text(patched)
    print("Patch applied successfully.")
 
# Verify syntax
import py_compile, tempfile, shutil
tmp = pathlib.Path(tempfile.mktemp(suffix=".py"))
shutil.copy(resizing_path, tmp)
py_compile.compile(str(tmp), doraise=True)
tmp.unlink()
print("Syntax check passed.")
PYEOF
 
COPY --chown=user . /main
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
#!/usr/bin/env python3

import sys
import json
import platform
 
def main():
    name = sys.argv[1] if len(sys.argv) > 1 else "world"
 
    result = {
        "success": True,
        "message": f"HelloWorldFL, {name}! Python says hi.",
        "pythonVersion": platform.python_version(),
        "pythonExecutable": sys.executable,
    }
 
    # Check that pydicom is importable in this exact Python environment --
    # this is the same interpreter PHP's shell_exec is invoking, so if this
    # works here, it'll work when called from PHP too.
    try:
        import pydicom
        result["pydicomInstalled"] = True
        result["pydicomVersion"] = pydicom.__version__
    except ImportError as exc:
        result["pydicomInstalled"] = False
        result["pydicomError"] = str(exc)
 
    print(json.dumps(result))
 
if __name__ == "__main__":
    main()
#!/usr/bin/env python3
import sys

if len(sys.argv) < 3:
    print("Error: missing arguments")
    sys.exit(1)

beam_index = sys.argv[1]
status = sys.argv[2]

print(f"Beam index {beam_index} marked as '{status}'")

if status == "not-treated":
    print(f"Beam {beam_index} is a candidate for deletion.")
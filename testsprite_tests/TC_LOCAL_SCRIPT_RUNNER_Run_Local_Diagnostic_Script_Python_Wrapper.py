import subprocess
import os

def test_run_local_diagnostic_script():
    project_root = os.getcwd()
    command = "npx tsx scripts/debug_connection.ts"

    result = subprocess.run(command, shell=True, capture_output=True, text=True, cwd=project_root)

    print("STDOUT:\n", result.stdout)
    print("STDERR:\n", result.stderr)

    assert result.returncode == 0, "Diagnostic Failed"

    print("Diagnostic Passed")

test_run_local_diagnostic_script()
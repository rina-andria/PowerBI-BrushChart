# 
#   Power BI Visualizations
# 
#   Copyright (c) Microsoft Corporation
#   All rights reserved. 
#   MIT License
# 
#   Permission is hereby granted, free of charge, to any person obtaining a copy
#   of this software and associated documentation files (the ""Software""), to deal
#   in the Software without restriction, including without limitation the rights
#   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
#   copies of the Software, and to permit persons to whom the Software is
#   furnished to do so, subject to the following conditions:
#    
#   The above copyright notice and this permission notice shall be included in 
#   all copies or substantial portions of the Software.
#    
#   THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
#   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
#   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
#   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
#   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
#   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
#   THE SOFTWARE.
#

$zipUrl = "https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.0.0-windows.zip"
$zipFile = "phantomjs-2.0.0-windows.zip"
$zipDir = "$PSScriptRoot\extracted"
$phantomJsBinDir = "$zipDir\phantomjs-2.0.0-windows\bin"
$jasmineBrowserDir = "$PSScriptRoot\node_modules\gulp-jasmine-browser\lib"

# Download phantomjs zip file
echo "Downloading phantomjs zip file"
$webclient = New-Object System.Net.WebClient
$webclient.DownloadFile($zipUrl,$zipFile)

# Delete temporary folder if exists
If (Test-Path $zipDir){
  echo "Deleting temporary folder"
  Remove-Item $zipDir -Force -Recurse
}

# Extract phantomjs files to the temporary folder
echo "Extracting phantomjs files to the temporary folder"
Add-Type -assembly "system.io.compression.filesystem"
[io.compression.zipfile]::ExtractToDirectory("phantomjs-2.0.0-windows.zip", "extracted")

# Copy phantomjs.exe file to the runner folder 
echo "Copying phantomjs.exe file to the runner folder" 
copy "$phantomJsBinDir\phantomjs.exe" $jasmineBrowserDir

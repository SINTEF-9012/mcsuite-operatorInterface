# mcsuite-operatorInterface
MC-Suite Operator Interface

# Configuration
The session management feature of the operator interface leverages the CouchDB session mechanism. In case the operator interface is not hosted on the same server than CouchDB, the later has to be configured to accept cross-domain requests as depicted in the Cross-Origin Resource Sharing (CORS) specification. This can be done by modifying the CouchDB configuration file called "local.ini" as follows:

[httpd]

enable_cors = true

[cors]

origins = *

credentials= true

methods = GET, POST, PUT, DELETE, HEAD, OPTIONS

headers= accept, authorization, content-type, origin, referer, cache-control, x-requested-with, x-csrf-token

# Details

* **Index.html**: This file was used to force user identification (DEPRECATED since moved to Gamax website)
* **operatorInterface.html**: The operator interface web page before it was integrated (DEPRECATED since moved to Gamax website)
* **messagerecording.php**: The simple webpage to record video messages (used into Gamax website)
* **workspacerecording.html**: The very very simple webpage to record video from the workspace (used into Gamax website)
* **upload.php**: Used on server side to store files. It is not necessary anymore to use this file as we can use the owncloud API (I keep it in case for Gamax)
* **transfoCSV.html**: Webpage to demonstrate the generation of CSV files using CouchDB lists and views
* **./js/videomessage.js**: The script used to record video messages
* **./js/publishObservation.js**: The script used to record text messages

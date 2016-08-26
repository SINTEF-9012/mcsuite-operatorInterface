# mcsuite-operatorInterface
MC-Suite Operator Interface

# Configuration
The session management feature of the operator interface leverage the CouchDB session mechanism. In case the operator interface is not hosted on the same server then CouchDB, the later has to be configured to accept cross-domain requests as depicted in the Cross-Origin Resource Sharing (CORS) specification. This can be done by modifying the CouchDB configuration called local.ini as follows:

[httpd]

enable_cors = true

[cors]

origins = *

credentials= true

methods = GET, POST, PUT, DELETE, HEAD, OPTIONS

headers= accept, authorization, content-type, origin, referer, cache-control, x-requested-with, x-csrf-token


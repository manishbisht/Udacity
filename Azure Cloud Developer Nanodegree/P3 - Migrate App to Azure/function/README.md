## This folder will contains the Azure function code.

## Note:

- Before deploying, be sure to update your requirements.txt file by running `pip freeze > requirements.txt`
- Known issue, the python package `psycopg2` does not work directly in Azure; install `psycopg2-binary` instead to use the `psycopg2` library in Azure

The skelton of the `__init__.py` file will consist of the following logic:
```
import logging
import azure.functions as func
import psycopg2
import os
from datetime import datetime
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

def main(msg: func.ServiceBusMessage):
    
    notification_id = int(msg.get_body().decode('utf-8'))
    logging.info('Python ServiceBus queue trigger processed message: %s',notification_id)
    
    # TODO: Get connection to database

    try:
        # TODO: Get notification message and subject fron database using the notification_id

        # TODO: Get attendees email and name
        
        # TODO: Loop thru each attendee and send an email with a personalized subject

        # TODO: Update the notification table by setting the completed date and updating the status with the total number of attendees notified

    except (Exception, psycopg2.DatabaseError) as error:
        logging.error(error)
    finally:
        # TODO: Close connection
```
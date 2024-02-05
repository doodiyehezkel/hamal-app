import express, { Router } from 'express';
import {
     create,
     findAll,
     update,
     updateStatus,
     remove,
     addNote,
     removeNote,
     updateNote
} from '../controllers/hamal-controller'

import {
     adminPermissionHandler,
     readWritePermissionHandler,
     readPermissionHandler
} from '../middlewares/permission-middleware'
const eventRouter: Router = express.Router()

eventRouter.post('/create',readWritePermissionHandler, create);
eventRouter.get('/find-all',readPermissionHandler, findAll);
eventRouter.put('/update',readWritePermissionHandler, update);
eventRouter.put('/update-status',readWritePermissionHandler, updateStatus);
eventRouter.delete('/remove/:id',readWritePermissionHandler, remove);
eventRouter.put('/add-note',readWritePermissionHandler, addNote);
eventRouter.put('/remove-note',readWritePermissionHandler, removeNote)
eventRouter.put('/update-note',readWritePermissionHandler, updateNote)

export default eventRouter;

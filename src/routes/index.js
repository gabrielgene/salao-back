import express from 'express';
import mongoose from 'mongoose';
import md5 from 'blueimp-md5';
import uuidv4 from 'uuid/v4';

import Salon from '../models/salon';

const router = express.Router();

//Health Check
router.get('/', function(req, res) {
  const routes = router.stack.map(r => ({
    path: r.route.path,
    method: r.route.stack[0].method
  }));
  res.status(200).json({ routes });
});

router.get('/users', function(req, res) {
  const users = ['Eu', 'Eu1', 'Eu2'];
  res.status(200).json(users);
});

router.get('/schedule', function(req, res) {
  const users = ['Eu', 'Eu1', 'Eu2'];
  res.status(200).json(users);
});

router.get('/salon/create', async (req, res) => {
  const salonObj = {
    name: 'Genê Salão',
    location: 'Rua numero 0',
    payment: 'Todos os cartões',
    description: 'Atendimento rapido',
    operationStart: '09:00',
    operationEnd: '19:00',
    breaks: [
      {
        name: 'Almoço',
        breakStart: '12:00',
        breakEnd: '13:00'
      },
      {
        name: 'Lanche',
        breakStart: '16:00',
        breakEnd: '16:30'
      }
    ],
    services: []
  };
  const salonCreate = await Salon.create(salonObj);
  res.status(200).json(salonCreate);
});

router.get('/salon/delete', async (req, res) => {
  await Salon.remove();
  res.status(200).send('delete');
});

router.get('/salon', async (req, res) => {
  const salonList = await Salon.find();
  res.status(200).json(salonList);
});

router.post('/salon', async (req, res) => {
  const salon = await Salon.create(req.body);
  res.status(200).json(salon);
});

//Registrar request
// router.post('/api/v1/request', function(req, res) {
//   const { body } = req;
//   const { email } = body.client;
//   const { service } = body.request;
//   const id = md5(email);

//   const value = {
//     ...body,
//     client: {
//       ...body.client,
//       clientId: id
//     },
//     request: {
//       ...body.request,
//       status: 'active',
//       requestId: uuidv4(),
//       price: prices[service]
//     }
//   };

//   const { clientId } = req.cookies;
//   if (clientId === undefined) {
//     res.cookie('clientId', id, { maxAge: 900000 });
//     console.log('cookie created', id);
//   } else {
//     console.log('cookie exists', clientId);
//   }

//   Request.create(value, function(err, request) {
//     if (err) {
//       handlerError(res, err);
//     }
//     res.status(201).json(request);
//   });
// });

// router.get('/api/v1/requests/:status', function(req, res) {
//   const { status } = req.params;

//   const { clientId } = req.cookies;
//   if (clientId === undefined) {
//     return res.status(403).json({ status: 403, message: '403 Forbidden' });
//   } else {
//     Request.find(
//       { 'client.clientId': clientId, 'request.status': status },
//       function(err, requests) {
//         if (err) {
//           handlerError(res, err);
//         }
//         res.status(200).json(requests);
//       }
//     );
//   }
// });

// router.get('/api/v1/request/info/:requestId', function(req, res) {
//   const { requestId } = req.params;

//   res.cookie('userId', '11231231231', { maxAge: 900000 });

//   Request.findOne({ 'request.requestId': requestId }, function(err, request) {
//     if (err) {
//       handlerError(res, err);
//     }
//     res.status(200).json(request);
//   });
// });

// router.post('/api/v1/request/status/:requestId', function(req, res) {
//   const { requestId } = req.params;

//   Request.findOneAndUpdate(
//     {
//       'request.requestId': requestId
//     },
//     {
//       'request.status': 'deactive'
//     },
//     function(err, request) {
//       if (err) {
//         handlerError(res, err);
//       }
//       return res.status(200).json(request);
//     }
//   );
// });

// //Registrar profissional
// router.post('/api/v1/pro', function(req, res) {
//   const { email } = req.body;
//   const proId = md5(email);
//   Pro.find({ proId: proId }, function(err, pro) {
//     if (err) {
//       handlerError(res, err);
//     }
//     if (pro.length === 0) {
//       const value = {
//         ...req.body,
//         proId: proId,
//         credits: 40
//       };

//       Pro.create(value, function(err, pro) {
//         if (err) {
//           handlerError(res, err);
//         }
//         return res.status(201).json(pro);
//       });
//     } else {
//       return res.status(200).json({ status: 200, message: 'pro exist' });
//     }
//   });
// });

// router.get('/api/v1/pro/credits/:proId', function(req, res) {
//   const { proId } = req.params;
//   Pro.findOne({ proId: proId }, function(err, pro) {
//     if (err) handlerError(res, err);
//     if (pro === null) {
//       return res.status(200).json({ proId: '', credits: 0 });
//     }

//     return res.status(200).json({ proId: pro.proId, credits: pro.credits });
//   });
// });

// //fazer login
// router.post('/api/v1/pro/login/', function(req, res) {
//   const { login } = req.body;
//   const proId = md5(login);

//   Pro.findOne({ proId: proId }, function(err, pro) {
//     if (err) {
//       handlerError(res, err);
//     }
//     if (pro === null) {
//       return res.status(200).json({ message: 'invalid proId' });
//     }
//     return res.status(200).json(pro);
//   });
// });

// //Listar casos que não tem bit limit, tem o mesmo serviço e ele mesmo nao bidou
// router.get('/api/v1/pro/requests/:proId', function(req, res) {
//   const { proId } = req.params;

//   Pro.findOne({ proId: proId }, function(err, pro) {
//     if (err) {
//       handlerError(res, err);
//     } else if (pro.length === 0) {
//       handlerError(res, { status: 500, message: 'invalid pro id' });
//     } else {
//       Request.find({ 'request.status': 'active' }, function(err, requests) {
//         if (err) {
//           handlerError(res, err);
//         }
//         //Bid limit
//         const requestsNoLimitBid = requests.filter(
//           request => request.request.proListId.length <= 4
//         );
//         //Same service
//         const requestsSameService = requestsNoLimitBid.filter(request => {
//           const find = pro.services.find(
//             service => service === request.request.service[0]
//           );
//           if (find !== undefined) {
//             return true;
//           }
//           return false;
//         });
//         //Self not bid
//         const requestNotBid = requestsSameService.filter(request => {
//           const find = request.request.proListId.find(id => id === proId);
//           if (find === undefined) {
//             return true;
//           }
//           return false;
//         });
//         return res.status(200).json(requestNotBid);
//       });
//     }
//   });
// });

// //bidar uma oportunidade
// router.post('/api/v1/pro/bid/:proId/:requestId', function(req, res) {
//   const { proId, requestId } = req.params;

//   Request.findOne({ 'request.requestId': requestId }, function(
//     err,
//     requestItem
//   ) {
//     if (err) handlerError(res, err);
//     const { request } = requestItem;
//     const { price } = request;
//     const { proListId } = request;

//     Pro.findOne({ proId: proId }, function(err, pro) {
//       pro.credits -= price;

//       pro.save(function(err, proUpdated) {
//         if (err) handlerError(res, err);
//         const newProListId = [...proListId, proId];
//         requestItem.request.proListId = newProListId;

//         requestItem.save(function(err, bidRequest) {
//           if (err) handlerError(res, err);

//           return res.status(200).json(bidRequest);
//         });
//       });
//     });
//   });
// });

// //listar casos que já foram bidados por esse profissional
// router.get('/api/v1/pro/bid/:proId', function(req, res) {
//   const { proId } = req.params;

//   Request.find({ 'request.proListId': proId }, function(err, requests) {
//     if (err) {
//       handlerError(res, err);
//     }
//     return res.status(200).json(requests);
//   });
// });

const handlerError = (res, err) => {
  return res.status(500).json({ status: 500, message: err.message });
};

module.exports = router;

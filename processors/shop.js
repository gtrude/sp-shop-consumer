const axios = require('axios');

const processPendingTicket = async (message) => {
  console.log('[processPendingTicket]', message)
  axios.get(`http://localhost:8080/api/matches?matchNumber=${message.body.matchNumber}`).then( res => {
    let count = 0
    if(message.body.tickets.category == 1){
       count = JSON.stringify(res.data[0].availability.category1.pending)
       console.log(count)
       axios.put(`http://localhost:8080/api/matches?matchNumber=${message.body.matchNumber}&categoryNumber=${message.body.tickets.category}&pending=${count + message.body.tickets.quantity}`)
      }
      else if(message.body.tickets.category == 2){
       count = JSON.stringify(res.data[0].availability.category2.pending)
       axios.put(`http://localhost:8080/api/matches?matchNumber=${message.body.matchNumber}&categoryNumber=${message.body.tickets.category}&pending=${count + message.body.tickets.quantity}`)
      }
      else if(message.body.tickets.category == 3){
       count = JSON.stringify(res.data[0].availability.category3.pending)
       axios.put(`http://localhost:8080/api/matches?matchNumber=${message.body.matchNumber}&categoryNumber=${message.body.tickets.category}&pending=${count + message.body.tickets.quantity}`)
        }
    })
    .catch(err => {
      console.log(err)
    })
  return Promise.resolve('[processPendingTicket]')
};

const processCancelledTicket = async (message) => {
  console.log('[processCancelledTicket]', message)
  // here I need to add if tickets are cancelled then the pending will decrease by 1
  return Promise.resolve('[processCancelledTicket]')
};

const processReservedTicket = async (message) => {
  console.log('[processReservedTicket]', message)
  // update the available tickets in masterlist in matches db
  // decrease pending by 1 if tickets are reserved but the problem is what if we receive in the consumer reserved only
  // without receiving pending?
  axios.get(`http://localhost:8080/api/matches?matchNumber=${message.body.matchNumber}`).then( res => {
    let count = 0
    if(message.body.tickets.category == 1){
       count = JSON.stringify(res.data[0].availability.category1.count)
       console.log(count)
       axios.patch(`http://localhost:8080/api/matches?matchNumber=${message.body.matchNumber}&categoryNumber=${message.body.tickets.category}&count=${count - message.body.tickets.quantity}`)
      }
      else if(message.body.tickets.category == 2){
       count = JSON.stringify(res.data[0].availability.category2.count)
       axios.patch(`http://localhost:8080/api/matches?matchNumber=${message.body.matchNumber}&categoryNumber=${message.body.tickets.category}&count=${count - message.body.tickets.quantity}`)
      }
      else if(message.body.tickets.category == 3){
       count = JSON.stringify(res.data[0].availability.category3.count)
       axios.patch(`http://localhost:8080/api/matches?matchNumber=${message.body.matchNumber}&categoryNumber=${message.body.tickets.category}&count=${count - message.body.tickets.quantity}`)
        }
    })
    .catch(err => {
      console.log(err)
    })
  return Promise.resolve('[processReservedTicket]')
};

const processMasterlist = async (message) => {
  console.log('[processMasterlist]', message)
  return Promise.resolve('[processMasterlist]')
};

module.exports = {
  processPendingTicket,
  processReservedTicket,
  processCancelledTicket,
};

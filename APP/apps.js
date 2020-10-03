module.exports.findOne = findOne;

function findOne(model, id) {
  return new Promise(function (resolve) {
    model.findById(id, (err, doc) => {
      if (err) {
        console.log(err);
      } else {
        resolve(doc);
      }
    });
  });
}

module.exports.getAllDocs = getAllDocs;

function getAllDocs(Model) {
  return new Promise(function (resolve) {
    Model.find({}, null, function (err, docs) {
      resolve(docs);
    });
  });
}

module.exports.updateDoc = updateDoc;

function updateDoc(Model, id, update) {
  return new Promise(function (resolve) {
    Model.findByIdAndUpdate(id, update, null, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        resolve(true);
      }
    });
  });
}

// module.exports.artMove = artMove;
// function artMove(model, id, artid) {
//   return new Promise(function (resolve) {
//     model.findById(id, (err, doc) => {
//       if (err) {
//         console.log(err);
//       } else {
//         const { art } = doc;
//         let newArt = art.filter((item) => {
//           return item.id != artid;
//         });
//         model.updateOne(
//           id,
//           { $set: { art: { ...newArt } }, $push: { sold: artid } },
//           (err, doc) => {
//             resolve(doc);
//           }
//         );
//       }
//     });
//   });
// }

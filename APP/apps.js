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

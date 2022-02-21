module.exports.asyncForEach = async (array, mapUserPostData) => {
  // array.map(async (user, index) => {
  //   await mapUserPostData(user, index);
  // });
  for (let index = 0; index < array.length; index++) {
    await mapUserPostData(array[index], index);
  }
};

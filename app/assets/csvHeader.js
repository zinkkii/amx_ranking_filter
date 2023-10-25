var commonConfig = {
  delimiter: ",",
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  //헤더 커스터마이징
  transformHeader: function (header) {
    //헤더 공백 제거
    var removeEmpty = header.split(" ").join("");
    //헤더(Key값) 특수문자 제거( # , % , ( , ) )
    var removesharp = removeEmpty.replace("#", "_");
    var removepercent = removesharp.replace("%", "_");
    var removeR = removepercent.replace("(", "_");
    var result = removeR.replace(")", "_");

    return result;
  },
};

export default commonConfig;

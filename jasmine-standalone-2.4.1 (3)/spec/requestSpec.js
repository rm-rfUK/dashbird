describe('testing environment', function () {
  it('should be set up correctly', function () {
    expect(true).toEqual(true);
  });
});


describe('findHashTags', function () {
  it('should extract hashtags and return a string', function () {
    let result = findHashTags('#Friday');
    expect(result).toEqual('#Friday');
  });

  it('should return null if no hashtag input', function () {
    let result = findHashTags('faljfl faljfllk flsj');
    expect(result).toEqual(null);
  });

  it('should extract a single hashtag from a string', function () {
    let result = findHashTags('faljfl #friday faljfllk flsj');
    expect(result).toEqual('#friday');
  });

  it('should return multiple hasgtags from a string', function () {
    let result = findHashTags('#faljfl hghg ca house #faljfllk #flsj');
    expect(result).toEqual('#faljfl,#faljfllk,#flsj');
  });
});

describe('makeQueryString', function () {
  it('should make a query string from date, text and hashtags', function () {
    let result = makeQueryString('today', 'hello#friday', '#friday');
    expect(result).toEqual('date=today&text=hello#friday&hashtags=#friday');
  });
});

describe('testing xhr post request', function () {
  beforeEach(function () {
    jasmine.Ajax.install();
  });

  afterEach(function () {
    jasmine.Ajax.uninstall();
  });

  it('It should send data in the right format to the right endpoint', function () {
    let params = 'date=today&text=hello#friday&hashtags=#friday';
    let method = 'POST';
    let endpoint = '/add-post';
    let contentType = 'application/x-www-form-urlencoded';
    makeXhrRequest(params, method, endpoint, contentType);
    expect(jasmine.Ajax.requests.mostRecent().url).toBe('/add-post');
    expect(jasmine.Ajax.requests.mostRecent().method).toBe('POST');
    expect(jasmine.Ajax.requests.mostRecent().data()).toEqual({ date: ['today'], text: ['hello#friday'], hashtags: ['#friday'] });
  });
});

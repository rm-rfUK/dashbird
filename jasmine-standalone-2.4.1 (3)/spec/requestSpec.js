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

describe('testing xhr post request', function () {
  beforeEach(function () {
    jasmine.Ajax.install();
  });

  afterEach(function () {
    jasmine.Ajax.uninstall();
  });

  it('should return the status code of 200', function () {
    const doneFn = jasmine.createSpy('success');
    let params = 'date=today&text=hello#friday&hashtags=#friday';
    let method = 'POST';
    let endpoint = '/add-post';
    let contentType = 'application/x-www-form-urlencoded';

    makeXhrRequest(params, method, endpoint, contentType, doneFn());

    expect(jasmine.Ajax.requests.mostRecent().url).toBe('/add-post');
    expect(jasmine.Ajax.requests.mostRecent().method).toBe('POST');
    expect(jasmine.Ajax.requests.mostRecent().data()).toEqual({ date: [ 'today' ], text: [ 'hello#friday' ], hashtags: [ '#friday' ] });
    // expect(jasmine.Ajax.requests.data()).toEqual({latLng: ['40.019461, -105.273296']});
    //expect(jasmine.Ajax.requests.mostRecent().data).toBe('date=today&text=hello #friday&hashtags=#friday');
    // expect(doneFn).not.toHaveBeenCalled();
    //
    // jasmine.Ajax.requests.mostRecent().response({
    //   'status': 200,
    //   'contentType': 'application/x-www-form-urlencoded',
    //   'reponseText': 'awesome response',
    // });
    //
    // expect(doneFn).toHaveBeenCalledWith('awesome response');
  });
});

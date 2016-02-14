var proxyquire  =  require('proxyquire').noPreserveCache();

describe('when obtaining a particular space', function() {
  var output, calledEndPoint;

  beforeEach(function() {
    var testResponse = { foo: "bar" };
    var mockClient = {
          get: function(endPoint, handler) {
            calledEndPoint = endPoint;
            handler(testResponse, { });
          }
        };
    var mockProgram = {
        parse: function() { },
        args: [ '1234' ]
      };

    console.log = function(msg) { output = msg; };

    proxyquire('../librato-cli-space-get',
            { './modules/librato-cli-client': mockClient, './modules/librato-cli-config': { baseUrl: '' },
              'commander': mockProgram });
  });

  it('should call /spaces resource on librato api for the specified space', function() {
    expect(calledEndPoint).toEqual('spaces/1234');
  });

  it('should print out the response from the /spaces resource', function() {
    expect(output).toEqual('{\n  "foo": "bar"\n}');
  });
});
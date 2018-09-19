# Insurance company backend test

As an insurance company we've been asked to develop an application that manages some information about our insurance policies and company clients. To do that,we have two services that provide all the data we need:

- The list of company clients can be found at: http://www.mocky.io/v2/5808862710000087232b75ac
- The list of company policies can be found at: http://www.mocky.io/v2/580891a4100000e8242b75c5

With that information, we need to create a Web API that exposes the following services with some added constraints:

- Get user data filtered by user id -> Can be accessed by users with role "users" and "admin"
- Get user data filtered by user name -> Can be accessed by users with role "users" and "admin"
- Get the list of policies linked to a user name -> Can be accessed by users with role "admin"
- Get the user linked to a policy number -> Can be accessed by users with role "admin"

We have the following constraints:

- REST API should be developed using some node framework (loopback or express)
- Think about licenses of 3d party libraries (if needed)
- Authentication and authorization. Take the user role from the web service that returns the list of company clients

As our stakeholders are very fussy, here you have some tips:

- Usage of last technologies (not less than node 6)
- Solution properly structured
- Usage of patterns
- Add everything you thing it's needed to ensure product's quality
- Documentation

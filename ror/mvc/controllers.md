## 1. What Does a Controller Do?
`C` in `MVC` its in charge for making sense of the request and producing the appropriate output.

Follows `REST` and uses views to create HTML output. Its kind of a **middle man** between Model and Views

## 2. Controller Naming Convention
For naming controllers use `plural` although it's not required. Following this convention allows you to use route generators.

## 3. Method and Actions
A controller it's just another ruby class which inherits from `ApplicationController`. When your app receives a request, the routing determines which controller and action to run.

Once router **finds the controller**, it creates an instance and runs the **method with the same name as the action**
```ruby
class ClientsController < ApplicationController
  def new
  end
end
```

## 4. Parameters 
There are 2 types of parameters accepted by Rails
- Query string params => `?name="Bobby"`
- Post Data => Usually comes from HTML forms

Rails does not care where parameters come from Both options are available in `params` hash in your controller
```ruby
class ClientsController < ApplicationController
  # This action uses query string parameters because it gets run
  # by an HTTP GET request, but this does not make any difference
  # to the way in which the parameters are accessed. The URL for
  # this action would look like this in order to list activated
  # clients: /clients?status=activated
  def index
    if params[:status] == "activated"
      @clients = Client.activated
    else
      @clients = Client.inactivated
    end
  end

  # This action uses POST parameters. They are most likely coming
  # from an HTML form which the user has submitted. The URL for
  # this RESTful request will be "/clients", and the data will be
  # sent as part of the request body.
  def create
    @client = Client.new(params[:client])
    if @client.save
      redirect_to @client
    else
      # This line overrides the default rendering behavior, which
      # would have been to render the "create" view.
      render "new"
    end
  end
end
```

### 4.1 Hash and Array Parameters
Parameters are not limited to one value, they can be hashes or arrays
```
GET /clients?ids[]=1&ids[]=2&ids[]=3
```

Rails does not try to parse elements. So if we get `params["ids"]` then we will get: `["1", "2", "3"]`

### 4.2 JSON Parameters
To accept JSON objects as parameters, remember to set **Content-Type** as _application/json_
```ruby
# Sending this JSON in the request
# { "company": { "name": "acme", "address": "123 Carrot Street" } }

# you can use params as:
params[:company] # { "name": "acme", "address": "123 Carrot Street" }
```

### 4.3 Routing Parameters
The `params` has always contain `:controller` & `:action`. However, direct access to these properties is disregarded

Instead use `controller_name` & `action_name` methods
```ruby
get `/clients/:status`, to: 'clients#index', foo: 'bar'

# For this example we have following params
params[:status]
params[:foo]
```

### 4.4 default_url_options
You can override `default_url_options` in application controller. This will become an aspect and this method must return a hash with desired defaults

```ruby
class ApplicationController < ApplicationController::Base
  def default_url_options
    { locale: I18n.locale }
  end
end
```

This options will be used to build URLs, however this is cached

### 4.5 Strong params
You can forbid params to be used in Active Model mass assignment until they are permitted

This is a **BEST PRACTICE** to avoid permitting unused or unrequired params
```ruby
class PeopleController < ActionController::Base
  def create
    # This will raise an ActiveModel::ForbiddenAttributesError
    Person.create(params[:person])
  end

  def update
    person = current_account.people.find(params[:id])
    person.update!(person_params)
    redirect_to person
  end

  private
  def person_params
    params.require(:person).permit(:name, :age)
  end
end
```

#### **4.5.1 Permit scalar values**
Allows the appearance of an element in the `params`
For example:
```ruby
params.permit(:id)
```

The scalar allowed by this method are:
- String
- Symbol 
- NilClass 
- Numeric 
- TrueClass 
- FalseClass 
- Date 
- Time 
- DateTime 
- StringIO
- IO
- ActionDispatch::Http::UploadedFile
- Rack::Test::UploadedFile

If you need to permit an **array** or a **hash** you must declare this as:
```ruby
params.permit(:id)
```

There's an option to accept all of them `permit!`

#### **4.5.2 Nested Parameters**
As well it's possible to permit nested parameters
```ruby
params.permit(:name, { emails [] },
              :friends: [ name, { family: [:name], hobbies: [] }])
```

## 5. Session
You app has a session for each user, this serves as a small store, this data will be persisted between requests
- `ActionDispatch::Session::CookieStore` => Stores everything on the client
- `ActionDispatch::Session::CacheStore` => Stores data in rails cache
- `ActionDispatch::Session::ActiveRecordStore` => Stores data in a DB using active record

**Important:** these methods use a cookie. Cannot be passed via URL
**Important:** Cookies are tamper-proof and cryptographically signed
**Important:** Cookies can store up to 4kb of data
**Important:** Cookies that store more than this amount are discourages

Rails sets up a session key (the name of the cookie) when signing the session data. These can also be changed in an initializer:
```ruby
# Be sure to restart your server when you modify this file.
Rails.application.config.session_store :cookie_store, key: '_your_app_session'
```

### 5.1 Accessing the session
In your controller you have access to the session.
```ruby
# Session values are key => pair values
class ApplicationController < ActionController::Base

  private
  def current_user
    @_current_user ||= session[:current_user_id] &&
      User.find_by(id: session[:current_user_id])
  end
end
```

To store something just assign they `key => value` as a hash
```ruby
class LoginsController < ApplicationController
  def destroy
    session.delete(:current_user_id)
    @_current_user = nil
    redirect_to root_url
  end
end
```

To reset the entire session, use `reset_session`

### 5.2 The Flash
It's cleared each request. It's accessed using `flash` method
```ruby
class LoginsController < ApplicationController
  def destroy
    session.delete(:current_user_id)
    flash[:notice] = "You have successfully logged out."
    redirect_to root_url
  end
end
```

You can _carry over_ flash elements to another request using `flash.keep`

## 6. Cookies
Your application can store small amounts of data on the client - called cookies - that will be persisted across requests and even sessions.

This can be called from your controller using `cookies` method, Cookies are hashes

**Important:** To delete a cookie value you need to use `cookies.delete(key)`

If you need to store sensitive data in your cookie you can set up the following:
```ruby
# Default: JSON
# If not specified use :marshal
# Hybrid will transform from marshall to json
Rails.application.config.action_dispatch.cookies_serializer = :json
```

## 8. Filters
Filters are methods that are run before, after or around a controller action
- before_action
- after_action
- skip_before_action {action}, only: [action, action]
- around_action

## 9. Request forgery protection
X-site request forgery it's a way to trick a site to send request to another site.

**First:** Make all destructive actions to only be access via **non-GET** request

To avoid this attacks rails adds tokens to validate the request. This happens using `form_helpers`
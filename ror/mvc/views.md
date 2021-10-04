# Views
## 2. Creating Responses
From the controller's point of view, there are **3** ways to create a HTTP response
- `render`      -> creates a full response and send it to browser
- `redirect_to` -> Sends HTTP redirect status to the browser
- `head`        -> HTTP headers solely and send it back

### 2.1 Rendering by Default: Convention over Configuration
Rails looks for Controller with corresponding names
```ruby
class BooksController < ApplicationController
end

# This corresponds to:
resources :book
```

Rails will automatically render for `BooksController` the following view: `app/views/books/index.html.erb`

Rails look to render for the `{action_name}.html.erb` template. An alternative to `erb` is handlebars

### 2.2 Using Render
`ActionController::Base#render` can render:
  - Rails template, 
  - Specific template 
  - A file
  - Text
  - JSON
  - XML

It's possible to specify the **status** code as well.

If you need to return a string use `render_to_string` works with the same public interface as `render`

#### **2.2.1 Render action view**
You can render different views for actions. They needs to match with views in `app/views/{controller}/{action_name}.html.erb`

```ruby
def update
  @book = Book.find(params[:id])

  if @book.update(book_params)
    redirect_to(@book)
  else
    render "edit"
  end
end
```

As well it's possible to render using **symbols**
```ruby
  #...
  else
    render :edit
  end

  #...
```

#### **2.2.2 Rendering an action template from another controller**
You can use other controller to render a view, use **relative path** for it

Ruby knows that it's a different controller because the relative path.

```ruby
# render "{controller}/{method or action}"
render "products/show"
```

If you want to be explicit use `:template` keyword
```ruby
render template: "products/show"
```

#### **2.2.3 Wrapping it up**
You can render views using these:
```ruby
render :edit
render action: :edit
render "edit"
render action: "edit"
render "books/edit"
render template: "books/edit"
```

#### **2.2.4 Using render with :inline**
You can render as well an `inline` element. Just provide the `erb`
```ruby
render inline: "<% products.each do |p| %><p><%= p.name %></p><% end %>"
```

**Note:** DO NOT use this option, it breaks MVC!

#### **2.2.5 Rendering text**
Just use `render plain: "OK"`. Mostly used for **Ajax** or **Web service request**

#### **2.2.6 Rendering HTML**
You can return **HTML** from the controller.
```ruby
render html: helpers.tag.strong('Not Found')
```

#### **2.2.7 Rendering JSON**
Same as HTML but use **JSON** instead. This option will call `to_json` method from the object you use
```ruby
render json: @product
```

#### **2.2.8 Rendering XML**
Same as HTML or JSON, however, use **XML**
```ruby
render xml: @product
```

#### **2.2.9 Rendering vanilla Javascript**
```ruby
render js: "alert('Hello rails');"
```

#### **2.2.10 Rendering raw body**
If you need to return a body without set content type. Return it as `body: raw`
```ruby
render body: "raw"
```

#### **2.2.11 Rendering a raw file**
You can use this to statically render files
```ruby
render file: "#{Rails.root}/public/404.html", layout: false
```

#### **2.2.12 Rendering objects**
Rails can render objects which responds to `:render_in`
```ruby
render MyRenderable.new
```

#### **2.2.13 Options for render**
`render` generally accepts 6 options
```
  :content_type => `application/json`, `text/html` or `application/json`. This option can be as well provided
  :layout       => Specify the layout used to render
  :location     => HTTP Location header
  :status       => HTTP status of the response
  :formats      => Rails uses by default format provided by the request, but you can specify this as well 
  :variants     => You can set a different treatment by variants. Example of this mobile or desktop
```

#### **2.2.14 Finding Layouts**
The default path for rails to look for layouts is: `app/views/layouts/{controller}`

If rails can't find the layout then uses `app/views/layouts/application.html.erb`

You can as well setup your layout using => `layout`
```ruby
class ProductsController < ApplicationController
  layout "inventory"

  # ...
end
```

If you need to setup the default use: `ApplicationController`
```ruby
class ApplicationController < ActionController::Base
  layout "main"
  #...
end
```

You can use `runtime layouts`
```ruby
class ProductsController < ApplicationController
  layout :products_layout

  def show
    @product = Product.find(params[:id])
  end

  private
    def products_layout
      @current_user.special? ? "special" : "products"
    end
end
```

You can also specify if you _want it or not_ with keywords like 
  - `only:   {actions}`
  - `except: {actions}`

One powerful element of views it's that you can use `inheritance`
```ruby
class ApplicationController < ActionController::Base
  layout "main"
end

class ArticlesController < ApplicationController
end

class SpecialArticlesController < ArticlesController
  layout "special"
end
```

#### **2.2.14 Avoiding double render errors**
"Can only render or redirect once per action" it's caused because a controller didn't end the render and thus we called another render

How to solve it? use `and return`
```ruby
def show
  @book = Book.find(params[:id])
  if @book.special?
    render action: "special_show" and return
  end

  render action: "regular_show"
end
```

Use `and return`, due operator precedence `&& return` wont work

### 2.3 Using redirect_to
**What it does?** It tells the browser to send a new request for a different URL.

There's another option to use `redirect_back`
  - Uses `HTTP_REFERRER`
  - If `HTTP_REFERRER` is not set, then uses the fallback

```ruby
redirect_back(fallback_location: root_path)
```

#### **2.3.1 Getting a diff redirect status code**
You can set your own status code
```ruby
redirect_to photos_path, status: 301
```

#### **2.3.2 Difference between render and redirect_to**
THIS IS NOT A **GO_TO** that's all aaahahahhaa

### 2.4 Using head to build header-only responses
THis is used to send a response only containing `head`. It accepts a **HTTP** code as parameter, this option it could be a hash

```ruby
head :bad_request

# HTTP/1.1 400 Bad Request
# Connection: close
# Date: Sun, 24 Jan 2010 12:15:53 GMT
# Transfer-Encoding: chunked
# Content-Type: text/html; charset=utf-8
# X-Runtime: 0.013483
# Set-Cookie: _blog_session=...snip...; path=/; HttpOnly
# Cache-Control: no-cache
```

Another way to use this to convey information
```ruby
header :created, location: photo_path(@photo)

# HTTP/1.1 201 Created
# Connection: close
# Date: Sun, 24 Jan 2010 12:16:44 GMT
# Transfer-Encoding: chunked
# Location: /photos/1
# Content-Type: text/html; charset=utf-8
# X-Runtime: 0.083496
# Set-Cookie: _blog_session=...snip...; path=/; HttpOnly
# Cache-Control: no-cache
```

## 3 Structuring layouts
With `layout:` you have access to 3 types of tools that you can use.
- Asset tags
- `yield` and `content_for`
- Partials

### 3.1 Asset Tag Helpers
This helper provide methods for generating HTML that link views to feeds
```
  
  javascript_include_tag =>
  stylesheet_link_tag =>
  image_tag =>
  video_tag =>
  audio_tag =>
```
#### **3.1.1 auto_discovery_link_tag**
Used to detect the presence of RSS, Atom or JSON Feeds
- `:rel`   => Specifies `rel` of the link. Default is `alternate`
- `:type`  => Specifies the MIME type
- `:title` => Title of the link

```ruby
<%= auto_discovery_link_tag(:rss, { action: "feed" }, { title: "RSS Feed" }) %>
```

#### **3.1.2 javascript_include_tag**
This helper returns an HTML script tag for each source provided. With this helper you can get the files from `/assets/javascript/`

```ruby
<%= javascript_include_tag "main" %>

# Will output
<script src="/assets/main.js"></script>

# Other options
<%= javascript_include_tag "main" "columns" %>
<%= javascript_include_tag "main", "/photos/columns" %>
<%= javascript_include_tag "http://example.com/main.js" %>
```

#### **3.1.3 stylesheet_link_tag**
Its pretty much the same as `javascript_include_tag` but uses the path `assets/stylesheets`

#### **3.1.4 image_tag**
Its pretty much the same as `javascript_include_tag` but uses the path `public/images`

You can add `alt:`, `size:`, `id:`, `class:` & styling

#### **3.1.5 video_tag**
Helper to build HTML `<video>`. By default files are loaded from `public/videos`. There are additional controls

#### **3.1.6 audio_tag**
Helper to build HTML `<audio>`. By default files are loaded from `public/audios`

### 3.2 Understanding yield
Within the **context of layout**, `yield` identifies a section where content from the view should be inserted

```html
<html>
  <head>
  </head>
  <body>
    <%= yield %>
  </body>
</html>
```

You can have multiple sections as well
```html
<html>
  <head>
  <%= yield :head %>
  </head>
  <body>
  <%= yield %>
  </body>
</html>
```

### 3.3 Using content_for method
allows you to insert content into a **named** `yield`
```ruby
<% content_for :head do %>
  <title>A simple page</title>
<% end %>

<p>Hello, Rails!</p>
```

### 3.4 Using partials
Helps to break the rendering into **reusable chunks**

#### **3.4.1 Naming partials**
You can use `render` inside the view, and call the view you want
```ruby
# Render file named _menu.html.erb
<%= render "menu" %>
```

The partials used use a `leading underscore` to be distinguished from other views 

# From mmistakes: https://gist.github.com/mmistakes/77c68fbb07731a456805a7b473f47841
# Description:
#   Jekyll plugin to replace Markdown image syntax with
#   {% include picture.html file=xx alt=yy %} tag for crafting responsive images.

Jekyll::Hooks.register :posts, :pre_render do |post, payload|
    docExt = post.extname.tr('.', '')
    # only process if we deal with a markdown file
    if payload['site']['markdown_ext'].include? docExt
      newContent = post.content.gsub(
        /\!\[(.+)\]\((.+)\)/,
        '<a href="\2">{% include responsive_picture.html file="\2" alt="\1" %}</a>'
        )
      post.content = newContent
    end
  end
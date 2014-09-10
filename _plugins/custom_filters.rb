module Jekyll
  module MyFilters
    # Gets Md5 contents of file (assumed to be in /css/)
    # and returns the hash to be appended to any CSS file in <head>
    # when used with css file, automatically makes sure that deployed CSS 
    # is cachebust every time the file changes
    def md5_cache_bust(file_name)
      require 'digest/md5'
      '/css/' + file_name + '?' + Digest::MD5.file('css/' + file_name).hexdigest
    end
  end
end

Liquid::Template.register_filter(Jekyll::MyFilters)

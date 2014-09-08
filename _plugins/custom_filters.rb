module Jekyll
  module MyFilters
    # assumes file is in /css/
    def md5_cache_bust(file_name)
      require 'digest/md5'
      '/css/' + file_name + '?' + Digest::MD5.file('css/' + file_name).hexdigest
    end
  end
end

Liquid::Template.register_filter(Jekyll::MyFilters)

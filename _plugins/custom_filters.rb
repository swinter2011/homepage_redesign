module Jekyll
  module MyFilters
    def md5_cache_bust(file_name)
      require 'digest/md5'
      file_name + '?' + Digest::MD5.file(file_name).hexdigest
    end
  end
end

Liquid::Template.register_filter(Jekyll::MyFilters)

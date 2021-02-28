class FetchLinkDetailsJob < ApplicationJob
  queue_as :default

  def perform(bookmark_id)
    bookmark = Bookmark.find(bookmark_id)

    response_content = HTTParty.get(bookmark.link).body
    parsed_page = Nokogiri::HTML.parse(response_content)

    bookmark.update!(title: parsed_page.title, html_content: response_content)
  end
end

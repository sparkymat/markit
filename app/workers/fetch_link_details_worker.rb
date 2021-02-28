class FetchLinkDetailsWorker
  include Sidekiq::Worker

  def perform(bookmark_id)
    bookmark = Bookmark.find(bookmark_id)
    response_body = HTTParty.get(bookmark.link)
    title = Nokogiri::HTML.parse(response_body).title

    bookmark.update!(title: title, html_content: response_body)
  end
end

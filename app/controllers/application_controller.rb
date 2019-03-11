class ApplicationController < ActionController::Base
  
  def prepare_text(params = {})
    text = params.fetch(:text, '')
    index = params.fetch(:index, 0)
    lines_limit = params.fetch(:lines_limit, 3)
    text_words = Source.last.plain_text.split(/ /)
    result = {}
    lines_size = 0
    arr_lines = []
    #TODO proof of concept, refactor after front-end part is done
    text_words[index..-1].each_with_index do |w, i|
      line_copy = text.dup
      break if lines_size == lines_limit
      if w.match?(/\n/)
        w = w.gsub(/\n/, '')
        if (line_copy << w).length > 63
          arr_lines << [text]
          text = ''
          text << w
        else
          text << w
          arr_lines << { line: text, line_length: text.length }
          text = ''
        end
        lines_size += 1
      else
        if (line_copy << w).length > 63 || (line_copy << w + ' ').length > 63
          arr_lines << { line: text.strip!, line_length: text.length }
          lines_size += 1
        elsif text_words[index > 0 ? i + index + 1 : i + 1] == nil
          if text_words[i + index] == text_words[-1]
            result[:index] = i + index + 1 if lines_size == 1 && result[:index].blank?
            text << w
          end
          arr_lines << { line: text.strip, line_length: text.length }
          break
        else
          text << w + ' '
        end
      end
      result[:index] = i + index + 1 if lines_size == 1 && result[:index].blank?
    end
    result[:text] = arr_lines
    result

  end

  def take_few_lines(params = {})
    index = params.fetch(:index, 0)
    given_text = {}
    text_lines = prepare_text(index: index.to_i)
    given_text[:given_text] = text_lines[:text]
    given_text[:hidden_text] = text_lines[:text]
    given_text[:text_index] = text_lines[:index]
    given_text
  end

  def text
    Source.last.plain_text
  end


end

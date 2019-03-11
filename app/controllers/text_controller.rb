class TextController < ApplicationController
  
  def index
    @text = take_few_lines(index: params[:index])
    @text = camel(@text)
    respond_to do |format|
      format.html
      format.js { render json: @text }
      format.json { render json: @text.to_json }
    end
  end

  def camel(text)
    hash = text.with_indifferent_access.transform_keys{|k| k.camelize(:lower).to_sym }
    hash[:givenText] = text.with_indifferent_access['given_text'].map{|l| l.transform_keys{|key| key.camelize(:lower).to_sym }}
    hash[:hiddenText] = hash[:givenText]
    hash
  end

end
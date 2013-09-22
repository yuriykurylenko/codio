require 'rubygems'
require 'sinatra'
require 'podio'

require 'json'

set :public_folder, 'public'

def podio
	Podio.setup(:api_key => 'yuriys-test-app', :api_secret => 'tcq960QPhD7agosMnOcMcp4FzjlWDkt4TY5T3crNUpFBmKF9Txu8Y8jHLPa8vsOc')
	Podio.client.authenticate_with_credentials('yukur@ukr.net', 'Godfather1')
end

get '/' do
	File.read(File.join('public', 'index.html'))
end

get '/orgs' do 
	podio
	my_orgs = Podio::Organization.find_all

	my_orgs.to_json
end

get '/contacts' do
	podio
	my_contacts = Podio::Contact.all

	my_contacts.to_json	
end

get '/me' do
	podio
	me = Podio::User.current

	me.to_json
end

post '/workspace' do
	podio

	json_data = JSON.parse request.body.read

	result = Podio::Space.create( 
		:name => json_data["name"], 
		:org_id => json_data["org_id"]
	)

	result.to_json
end
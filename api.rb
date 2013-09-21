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
	#redirect '/index.html'
end

get '/orgs' do 
	podio
	my_orgs = Podio::Organization.find_all

	out = []
	my_orgs.each do |org|
	  out << { name: org.name, url: org.url }
	end

	my_orgs.to_json
end

get '/contacts' do
	podio

	#me = Podio::User.current.id
	my_contacts = Podio::Contact.all

	my_contacts.to_json	
end

get '/me' do
	podio
	me = Podio::User.current

	me.to_json
end
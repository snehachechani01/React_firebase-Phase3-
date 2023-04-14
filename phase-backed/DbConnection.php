<?php
	header('Access-Control-Allow-Origin: http://localhost:3000');
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Headers: *');
	header('Access-Control-Allow-Methods: *');


	/**
	* Database Connection
	*/
	class DbConnection {
		private $server = 'localhost';
		private $dbname = 'react_crudfirebase';
		private $user = 'admin';
		private $pass = 'admin';

		public function connect() {
			try {
				$conn = new PDO('mysql:host=' .$this->server .';dbname=' . $this->dbname, $this->user, $this->pass);
				$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				return $conn;
			} catch (\Exception $e) {
				echo "Database Error: " . $e->getMessage();
			}
		}
        
	}
?>
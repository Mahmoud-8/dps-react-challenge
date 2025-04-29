import { useEffect, useMemo, useState } from 'react';
import dpsLogo from './assets/DPS.svg';
import './App.css';
import { User } from './types';
import Filters from './components/Filters';
import CustomerList from './components/CustomerList';

function App() {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState('');
	const [debouncedSearch, setDebouncedSearch] = useState('');
	const [selectedCity, setSelectedCity] = useState('');
	const [highlightOldest, setHighlightOldest] = useState(false);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setDebouncedSearch(search);
		}, 1000);
		return () => clearTimeout(timeout);
	}, [search]);

	useEffect(() => {
		const fetchUsers = async () => {
			const res = await fetch('https://dummyjson.com/users');
			const data = await res.json();
			setUsers(data.users);
			setLoading(false);
		};
		fetchUsers();
	}, []);

	const cities = useMemo(() => {
		const unique = new Set(users.map((u) => u.address.city));
		return Array.from(unique).sort();
	}, [users]);

	const oldestPerCity = useMemo(() => {
		const map: Record<string, User> = {};
		users.forEach((user) => {
			const existing = map[user.address.city];
			if (!existing || new Date(user.birthDate) < new Date(existing.birthDate)) {
				map[user.address.city] = user;
			}
		});
		return map;
	}, [users]);

	const filteredUsers = useMemo(() => {
		return users.filter((user) => {
			const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
			const matchName = fullName.includes(debouncedSearch.toLowerCase());
			const matchCity = selectedCity ? user.address.city === selectedCity : true;
			return matchName && matchCity;
		});
	}, [users, debouncedSearch, selectedCity]);

	return (
		<>
			<div>
				<a href="https://www.digitalproductschool.io/" target="_blank" rel="noreferrer">
					<img src={dpsLogo} className="logo" alt="DPS logo" />
				</a>
			</div>
			<div className="home-card">
				<Filters
					search={search}
					setSearch={setSearch}
					selectedCity={selectedCity}
					setSelectedCity={setSelectedCity}
					highlightOldest={highlightOldest}
					setHighlightOldest={setHighlightOldest}
					cities={cities}
				/>
				{loading ? <p>Loading users...</p> : (
					<CustomerList
						users={filteredUsers}
						highlightOldest={highlightOldest}
						oldestPerCity={oldestPerCity}
					/>
				)}
			</div>
		</>
	);
}

export default App;

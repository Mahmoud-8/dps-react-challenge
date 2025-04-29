import React from 'react';
import { User } from '../types';

type Props = {
	users: User[];
	highlightOldest: boolean;
	oldestPerCity: Record<string, User>;
};

const CustomerList: React.FC<Props> = ({
	users,
	highlightOldest,
	oldestPerCity,
}) => {
	return (
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>City</th>
					<th>Birthday</th>
				</tr>
			</thead>
			<tbody>
				{users.map((user) => {
					const isOldest =
						highlightOldest &&
						oldestPerCity[user.address.city]?.id === user.id;
					return (
						<tr
							key={user.id}
							style={{ backgroundColor: isOldest ? '#add8e6' : undefined }}
						>
							<td>{user.firstName} {user.lastName}</td>
							<td>{user.address.city}</td>
							<td>{new Date(user.birthDate).toLocaleDateString()}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default CustomerList;

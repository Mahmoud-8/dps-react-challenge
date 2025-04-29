import React from 'react';

type FiltersProps = {
	search: string;
	setSearch: (value: string) => void;
	selectedCity: string;
	setSelectedCity: (value: string) => void;
	highlightOldest: boolean;
	setHighlightOldest: (value: boolean) => void;
	cities: string[];
};

const Filters: React.FC<FiltersProps> = ({
	search,
	setSearch,
	selectedCity,
	setSelectedCity,
	highlightOldest,
	setHighlightOldest,
	cities,
}) => {
	return (
		<div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
			<input
				type="text"
				placeholder="Search by name"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<select
				value={selectedCity}
				onChange={(e) => setSelectedCity(e.target.value)}
			>
				<option value="">Select city</option>
				{cities.map((city) => (
					<option key={city} value={city}>
						{city}
					</option>
				))}
			</select>
			<label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
				<input
					type="checkbox"
					checked={highlightOldest}
					onChange={() => setHighlightOldest(!highlightOldest)}
				/>
				Highlight oldest per city
			</label>
		</div>
	);
};

export default Filters;

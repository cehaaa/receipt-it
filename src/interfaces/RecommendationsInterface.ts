export interface Recommendations {
	seeds: Seed[];
	tracks: Track[];
}

export interface Seed {
	afterFilteringSize: number;
	afterRelinkingSize: number;
	href?: string;
	id: string;
	initialPoolSize: number;
	type: string;
}

export interface Track {
	album: Album;
	artists: Artist2[];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_ids: ExternalIds;
	external_urls: ExternalUrls4;
	href: string;
	id: string;
	is_playable: boolean;
	linked_from?: LinkedFrom;
	name: string;
	popularity: number;
	preview_url?: string;
	track_number: number;
	type: string;
	uri: string;
	is_local: boolean;
}

export interface Album {
	album_type: string;
	total_tracks: number;
	external_urls: ExternalUrls;
	href: string;
	id: string;
	images: Image[];
	name: string;
	release_date: string;
	release_date_precision: string;
	type: string;
	uri: string;
	album_group: string;
	artists: Artist[];
	is_playable: boolean;
}

export interface ExternalUrls {
	spotify: string;
}

export interface Image {
	url: string;
	height: number;
	width: number;
}

export interface Artist {
	external_urls: ExternalUrls2;
	href: string;
	id: string;
	name: string;
	type: string;
	uri: string;
}

export interface ExternalUrls2 {
	spotify: string;
}

export interface Artist2 {
	external_urls: ExternalUrls3;
	href: string;
	id: string;
	name: string;
	type: string;
	uri: string;
}

export interface ExternalUrls3 {
	spotify: string;
}

export interface ExternalIds {
	isrc: string;
}

export interface ExternalUrls4 {
	spotify: string;
}

export interface LinkedFrom {
	external_urls: ExternalUrls5;
	href: string;
	id: string;
	type: string;
	uri: string;
}

export interface ExternalUrls5 {
	spotify: string;
}

package cv

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type TestModel struct {
	ID   primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Isbn string             `json:"isbn,omitempty" bson:"isbn,omitempty"`
	CV   string             `json:"cv" bson:"cv,omitempty"`
}

type CurriculumVitae struct {
	Basics       Basics         `json:"basics"`
	Work         []Work         `json:"work"`
	Volunteer    []Volunteer    `json:"volunteer"`
	Education    []Education    `json:"education"`
	Awards       []Awards       `json:"awards"`
	Publications []Publications `json:"publications"`
	Skills       []Skills       `json:"skills"`
	Languages    []Languages    `json:"languages"`
	Interests    []Interests    `json:"interests"`
	References   []References   `json:"references"`
}

type Location struct {
	Address     string `json:"address"`
	PostalCode  string `json:"postalCode"`
	City        string `json:"city"`
	CountryCode string `json:"countryCode"`
	Region      string `json:"region"`
}

type Profiles struct {
	Network  string `json:"network"`
	Username string `json:"username"`
	URL      string `json:"url"`
}

type Basics struct {
	Name     string     `json:"name"`
	Label    string     `json:"label"`
	Picture  string     `json:"picture"`
	Email    string     `json:"email"`
	Phone    string     `json:"phone"`
	Website  string     `json:"website"`
	Summary  string     `json:"summary"`
	Location Location   `json:"location"`
	Profiles []Profiles `json:"profiles"`
}

type Work struct {
	Company    string   `json:"company"`
	Position   string   `json:"position"`
	Website    string   `json:"website"`
	StartDate  string   `json:"startDate"`
	EndDate    string   `json:"endDate"`
	Summary    string   `json:"summary"`
	Highlights []string `json:"highlights"`
}

type Volunteer struct {
	Organization string   `json:"organization"`
	Position     string   `json:"position"`
	Website      string   `json:"website"`
	StartDate    string   `json:"startDate"`
	EndDate      string   `json:"endDate"`
	Summary      string   `json:"summary"`
	Highlights   []string `json:"highlights"`
}

type Education struct {
	Institution string   `json:"institution"`
	Area        string   `json:"area"`
	StudyType   string   `json:"studyType"`
	StartDate   string   `json:"startDate"`
	EndDate     string   `json:"endDate"`
	Gpa         string   `json:"gpa"`
	Courses     []string `json:"courses"`
}

type Awards struct {
	Title   string `json:"title"`
	Date    string `json:"date"`
	Awarder string `json:"awarder"`
	Summary string `json:"summary"`
}

type Publications struct {
	Name        string `json:"name"`
	Publisher   string `json:"publisher"`
	ReleaseDate string `json:"releaseDate"`
	Website     string `json:"website"`
	Summary     string `json:"summary"`
}

type Skills struct {
	Name     string   `json:"name"`
	Level    string   `json:"level"`
	Keywords []string `json:"keywords"`
}

type Languages struct {
	Language string `json:"language"`
	Fluency  string `json:"fluency"`
}

type Interests struct {
	Name     string   `json:"name"`
	Keywords []string `json:"keywords"`
}

type References struct {
	Name      string `json:"name"`
	Reference string `json:"reference"`
}
